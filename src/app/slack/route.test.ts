/**
 * @jest-environment node
 */
import { GET } from './route';

describe('/api/slack', () => {
  test('returns a list of users from slack', async () => {
    const response = await GET()
    const body = await response.json()
    expect(response.status).toBe(200)
  })
})
