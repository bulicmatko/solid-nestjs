import { Injectable } from "@nestjs/common";

const DEFAULT_TAKE = 10;

interface Filter {
  readonly take?: number;
  readonly after?: string;
}

interface PaginationQuery {
  readonly take: number;
  readonly skip?: number;
  readonly cursor?: {
    readonly id: string;
  };
}

interface Entity {
  readonly id: string;
}

interface Connection<T> {
  readonly edges: Array<{
    readonly node: T;
    readonly cursor: string;
  }>;
  readonly pageInfo: {
    readonly endCursor: string | null;
    readonly hasNextPage: boolean;
  };
}

@Injectable()
export class PaginationService {
  getPaginationQuery(filter?: Filter): PaginationQuery {
    const take = filter?.take || DEFAULT_TAKE;
    const after = filter?.after || undefined;

    return {
      take: take + 1,
      skip: after ? 1 : undefined,
      cursor: after ? { id: after } : undefined,
    };
  }

  toConnection<T extends Entity>(data: T[], filter?: Filter): Connection<T> {
    const take = filter?.take || DEFAULT_TAKE;

    const hasNextPage = data.length > take;
    const nodes = hasNextPage ? data.slice(0, data.length - 1) : data;
    const edges = nodes.map((node) => ({ node: node, cursor: node.id }));
    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

    return { edges, pageInfo: { endCursor, hasNextPage } };
  }
}
