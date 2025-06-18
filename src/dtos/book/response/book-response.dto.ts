export interface BookResponseDto {
  isbn: string;
  bookTitle: string;
  categoryName: string;
  authorName: string;
  publisherName: string;
  bookPrice: number;
  publishedDate: Date;
  coverUrl?: string;
  pageCount: string;
  language: string;
  description?: string;
  bookStatus?: 'ACTIVE' | 'INACTIVE' | 'HIDDEN';
  policyId: number;
}