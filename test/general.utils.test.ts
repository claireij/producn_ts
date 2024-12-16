import { hasWhitespaces } from "@utils/general.utils"
import { expect } from "chai"
import { describe } from "mocha"

describe("General utils test", () => {
    it("", () => {
        expect(hasWhitespaces("hey hey")).to.be.true
    })
})