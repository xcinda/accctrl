"use server"

import { headers } from 'next/headers'

export async function GetHeaders() {
  const headersList = await headers()
  const userAgent = headersList.get('user-agent')

  return(headersList);
}