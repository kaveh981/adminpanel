interface ProductCategory {
    parent?: ProductCategory,
    category: string,
    categoryId: number,
    parentCategoryId?: number,
    status: Status,
    creator?: Creator
    timestamp?: Date,
    children?: ProductCategory[]
}

interface Product {
    name: string,
    categoryId: number,
    status: Status
}

interface ProductFilter {
    name?: string,
    categoryId?: number,
    status?: Status,
    pagination?: Pagination
}

