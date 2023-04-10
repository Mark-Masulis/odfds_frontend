import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import fetchMock from 'jest-fetch-mock'
import { MemoryRouter } from 'react-router-dom'

import RestaurantProfile from '../RestaurantProfile'

const goodFakeToken = "fake_token_1234567890"
const badFakeToken="asdfasdfasdf"

const getProfileSuccess= {
    "code": 200,
    "data": {
      "id": 1,
      "email": "steven.panxd@gmail.com",
      "phone": "4081234567",
      "name": "My Restaurant",
      "street": "1 Washington Square",
      "city": "San Jose",
      "state": "California",
      "zipCode": "95192",
      "verification": "NOTVERIFIED"
    }
  }

  const getProfileFailure = {
    "code": 401,
    "data": "Please log in"
  }

describe("Restaurant Account Pages", () => {
    describe("Renders Components with succesful fetch", () => {

        beforeAll(() => {
            fetchMock.enableMocks()
        })

        beforeEach(() => {
            fetch.mockResponseOnce(JSON.stringify(getProfileSuccess))
        })

        it("Renders Profile", async () => {
            const {getByText} = render(
                <MemoryRouter initialEntries={['/restaurant/profile']}>
                    <RestaurantProfile
                        token={goodFakeToken}
                    />
                </MemoryRouter>
            )
            await waitFor(() => {
                expect(getByText("steven.panxd@gmail.com")).toBeInTheDocument()
            })
            userEvent.click(getByText("Edit Profile"))
            expect(getByText("Edit Payment Information"))
        })

        afterAll(() => {
            fetchMock.disableMocks()
        })
    })

    describe("Unsuccesful Profile Fetch", () => {

        beforeAll(() => {
            fetchMock.enableMocks()
        })

        beforeEach(() => {
            fetch.mockResponseOnce(JSON.stringify(getProfileFailure))
        })

        it("Renders Profile", async () => {
            const {getByText} = render(
                <MemoryRouter initialEntries={['/restaurant/profile']}>
                    <RestaurantProfile
                        token={badFakeToken}
                    />
                </MemoryRouter>
            )
            await waitFor(() => {
                expect(getByText("Error: Unable to access account")).toBeInTheDocument()
            })
        })

        afterAll(() => {
            fetchMock.disableMocks()
        })
    })
})