import { Injectable, UnprocessableEntityException } from "@nestjs/common";

type Input<T> = {
  readonly [K in keyof T]: Promise<T[K]>;
};

type Output<T> = {
  readonly [K in keyof T]: T[K];
};

@Injectable()
export class ObjectValidatorService {
  async validate<T>(input: Input<T>): Promise<Output<T>> {
    const keys = Object.keys(input);
    const values = Object.values(input);

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

    const output = results.reduce(
      (acc, value, index) =>
        value.status === "fulfilled"
          ? { ...acc, [keys[index]]: value?.value }
          : acc,
      {},
    );

    return output as Output<T>;
  }
}
