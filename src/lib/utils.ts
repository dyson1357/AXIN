/**
 * 클래스명을 결합하는 간단한 유틸리티 함수
 */
export function cn(...classNames: (string | undefined | null | false)[]) {
  return classNames.filter(Boolean).join(' ');
}
