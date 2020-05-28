import { pingCmd } from "../../src/commands/ping"

it("Test Ping Command", () => {
    expect(pingCmd.name).toBe("ping")    
})