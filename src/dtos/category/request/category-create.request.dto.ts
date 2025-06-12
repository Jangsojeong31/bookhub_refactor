export interface CategoryCreateRequestDto {
  categoryName: string;
  categoryLevel: number;
  categoryType: 'DOMESTIC' | 'FOREIGN';
  parentCategoryId?: number; // 소분류일때만 필요
  categoryOrder?: number;
}