interface Employee {
  id: bigint;
  loginid: string;
}

export default interface SignInResponseDto {
  token: string; // 토큰 정보
  employee: Employee;
  exprTime: number; // 만료 시간
}