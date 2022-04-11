export interface Filter {
  readonly take?: number;
  readonly after?: string;
}

export interface PaginationQuery {
  readonly take: number;
  readonly skip?: number;
  readonly cursor?: {
    readonly id: string;
  };
}

export interface Connection<T> {
  readonly edges: Array<{
    readonly node: T;
    readonly cursor: string;
  }>;
  readonly pageInfo: {
    readonly endCursor: string | null;
    readonly hasNextPage: boolean;
  };
}
