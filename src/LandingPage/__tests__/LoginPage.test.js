import { render, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'

import LoginPage from './../LoginPage'

describe("Login Page", () => {
    it("Renders driver page at /login/driver", () => {
        const {getByText} = render(
            <MemoryRouter initialEntries={['/login/driver']} initialIndex={0}>
                <Routes>
                    <Route path='/login/:userType'element={<LoginPage/>}/>
                </Routes>
            </MemoryRouter>
        )
        expect(getByText("Driver Sign-in")).toBeInTheDocument()
    })

    it("Renders restaurant page at /login/restaurant", () => {
        const {getByText} = render(
            <MemoryRouter initialEntries={['/login/restaurant']} initialIndex={0}>
                <Routes>
                    <Route path='/login/:userType'element={<LoginPage/>}/>
                </Routes>
            </MemoryRouter>
        )
        expect(getByText("Restaurant Sign-in")).toBeInTheDocument()
    })
})