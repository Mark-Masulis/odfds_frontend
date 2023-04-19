import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import fetchMock from 'jest-fetch-mock'
import { MemoryRouter } from 'react-router-dom'

import DriverProfile from '../DriverProfile'

const goodFakeToken = "fake_token_1234567890"
const badFakeToken="asdfasdfasdf"

const getProfileSuccess= {
    "code": 200,
    "data": {
      "id": 1,
      "email": "steven.panxd@gmail.com",
      "phone": "4081234567",
      "driverLicenseNumber": "Y1234567",
      "driverLicenseImage": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
      "firstName": "Steven",
      "lastName": "Pan",
      "middleName": null,
      "verification": "NOTVERIFIED"
    }
  }

  const getProfileFailure = {
    "code": 401,
    "data": "Please log in"
  }

  const fakeStripeProfile = {
    "code" : 200,
    "data" : {
        "requirements" : {
            "currently_due" : [],
            "eventually_due" : []
        }
    }
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
                <MemoryRouter initialEntries={['/driver/profile']}>
                    <DriverProfile
                        token={goodFakeToken}
                    />
                </MemoryRouter>
            )
            await waitFor(() => {
                expect(getByText("steven.panxd@gmail.com")).toBeInTheDocument()
            })
            fetch.mockResponseOnce(JSON.stringify(fakeStripeProfile)) //mock stripe profile fetch
            userEvent.click(getByText("Edit Profile"))
            expect(getByText("Update Payment Information"))
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
                <MemoryRouter initialEntries={['/driver/profile']}>
                    <DriverProfile
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