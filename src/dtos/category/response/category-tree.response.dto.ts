export interface CategoryTreeResponseDto {
  categoryId: number;
  categoryName: string;
  categoryLevel: number;
  categoryType: 'DOMESTIC' | 'FOREIGN';
  parentCategoryId?: number;
  categoryOrder?: number;
  isActive: boolean;
  subCategories?: CategoryTreeResponseDto[]; // 트리 구조
}