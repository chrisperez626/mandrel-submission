import '@testing-library/jest-dom'
import { render, screen, act } from '@testing-library/react'
import HomePage from './page'

const unmockedFetch = global.fetch

beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
})

afterAll(() => {
  global.fetch = unmockedFetch
})

test('HomePage', () => {
  act(async () => {
    const dom = render(<HomePage />)
    const data = await dom.findByText("Christian")
    expect(data).toBeTruthy()
    // const heading = screen.getByRole('heading', { level: 1 })
 
    // expect(heading).toBeInTheDocument()
  })
})