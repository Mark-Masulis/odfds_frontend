import { render, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'

import RestaurantReset from './../RestaurantForgotPassword'
import DriverReset from './../DriverForgotPassword'

describe("Reset Password Page", () => {
    it("Renders driver page at /login/driver/reset", () => {
        const {getByText} = render(
            <MemoryRouter initialEntries={['/login/driver/reset']} initialIndex={0}>
                <Routes>
                    <Route path='/login/:userType/reset'element={<DriverReset/>}/>
                </Routes>
            </MemoryRouter>
        )
        expect(getByText("Forgot Password - Driver Account")).toBeInTheDocument()
    })

    it("Renders restaurant page at /login/restaurant/reset", () => {
        const {getByText} = render(
            <MemoryRouter initialEntries={['/login/restaurant/reset']} initialIndex={0}>
                <Routes>
                    <Route path='/login/:userType/reset'element={<RestaurantReset/>}/>
                </Routes>
            </MemoryRouter>
        )
        expect(getByText("Forgot Password - Restaurant Account")).toBeInTheDocument()
    })
})