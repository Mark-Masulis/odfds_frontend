import { render, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'

import CreateAccount from './../CreateAccountPage'

describe("Create Acctount Page", () => {
    it("Renders driver page at /signup/driver", () => {
        const {getByText} = render(
            <MemoryRouter initialEntries={['/signup/driver']} initialIndex={0}>
                <Routes>
                    <Route path='/signup/:userType'element={<CreateAccount/>}/>
                </Routes>
            </MemoryRouter>
        )
        expect(getByText("Create an Account - Driver")).toBeInTheDocument()
    })

    it("Renders restaurant page at /signup/restaurant", () => {
        const {getByText} = render(
            <MemoryRouter initialEntries={['/signup/restaurant']} initialIndex={0}>
                <Routes>
                    <Route path='/signup/:userType'element={<CreateAccount/>}/>
                </Routes>
            </MemoryRouter>
        )
        expect(getByText("Create an Account - Restaurant")).toBeInTheDocument()
    })
})