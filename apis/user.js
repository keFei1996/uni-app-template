import http from '@/utils/request.js'

export function login() {
  return http.request({
    url: 'login'
  })
}

export function test() {
  return http.request({
    url: 'api/test'
  })
}