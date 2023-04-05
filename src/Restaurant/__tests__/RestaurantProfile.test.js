import { render } from '@testing-library/react'
import fetchMock from 'jest-fetch-mock'

import RestaurantProfile from './../RestaurantProfile'

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

describe("Restaurant Profile Page", () => {
    describe("Succesful Profile Fetch", () => {

        beforeAll(() => {
            fetchMock.get(process.env.REACT_APP_API + '/restaurant/profile', getProfileSuccess)
        })

        it("Renders View Page", () => {
            fetchMock.mockResponseOnce(() => {
                
            })
            const {getByText} = render(
                <RestaurantProfile
                    token="fake_token_1234567890"
                />
            )
            expect(getByText("SOME VALUE")).toBeInTheDocument()
        })

        it("Renders Edit Page", () => {

        })
    })

    describe("Unsuccesful Profile Fetch", () => {
        it("Renders View Page", () => {

        })

        it("Renders Edit Page", () => {

        })
    })
})