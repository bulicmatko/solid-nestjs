import { UnprocessableEntityException } from "@nestjs/common";

type Input<T> = {
  readonly [K in keyof T]: Promise<T[K]>;
};

type Result<T> = {
  readonly [K in keyof T]: T[K];
};

export async function combineValidators<T>(data: Input<T>): Promise<Result<T>> {
  const keys = Object.keys(data);
  const values = Object.values(data);

  const results = await Promise.allSettled(values);

  const fields = results
    .map((value, index) =>
      value.status === "rejected"
        ? { name: keys[index], message: value.reason.message }
        : undefined,
    )
    .filter(Boolean);

  if (fields.length) {
    throw new UnprocessableEntityException({ fields });
  }

  const result = results.reduce(
    (acc, value, index) =>
      value.status === "fulfilled"
        ? { ...acc, [keys[index]]: value?.value }
        : acc,
    {},
  );

  return result as Result<T>;
}
