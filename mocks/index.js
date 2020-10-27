import Mock from 'better-mock/dist/mock.mp.js'

Mock.mock('api/test', {
  'list|1-10': [{
    'id|+1': 1
  }]
})