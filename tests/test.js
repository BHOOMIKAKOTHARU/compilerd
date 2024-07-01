const axios = require('axios')
const { testCases } = require('./data/testJson')
const { describe, expect, it } = require('@jest/globals')

const ENDPOINT = process.env.ENDPOINT || 'http://localhost:3000/api/execute/'

describe('Tests', () => {
    for (const testCase of testCases) {
        it(testCase.name, async () => {
            const response = await axios.post(ENDPOINT, testCase.reqObject)
            if (typeof response.data.output === 'object') {
                expect(response.data.output.score).toBeDefined()
                expect(response.data.output.rationale.positives).toBeDefined()
                expect(response.data.output.rationale.negatives).toBeDefined()
                expect(response.data.output.points).toBeDefined()
            } else {
                expect(response).toHaveProperty('data.output', testCase.expectedResponse.val)
            }
            expect(response).toHaveProperty('status', testCase.expectedResponse.status)
            expect(response).toHaveProperty('data.error', testCase.expectedResponse.error)
        }, 15000)
    }
}
// tests/codeRunner.test.js
const { runCode } = require('../services/codeRunner');

describe('Code Runner', () => {
    it('should run JavaScript code', async () => {
        const output = await runCode('javascript', 'console.log("Hello, World!")');
        expect(output.trim()).toBe('Hello, World!');
    });

    it('should run Python code', async () => {
        const output = await runCode('python', 'print("Hello, World!")');
        expect(output.trim()).toBe('Hello, World!');
    });

;

    // Add more tests as needed
});
)
