import type { NextRequest, NextResponse } from 'next/server'

declare module 'next/server' {
  export function PATCH(
    request: NextRequest,
    context: { params: { [key: string]: string } }
  ): Promise<NextResponse> | NextResponse

  export function DELETE(
    request: NextRequest,
    context: { params: { [key: string]: string } }
  ): Promise<NextResponse> | NextResponse
}
