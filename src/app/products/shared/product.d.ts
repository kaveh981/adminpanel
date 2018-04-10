interface ProductCategory {
    parent?:ProductCategory,
    category: string,
    categoryId: number,
    parentCategoryId?: number,
    status: Status,
    creator?: Creator
    timestamp?: Date,
    children?: ProductCategory[]
}

