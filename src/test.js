const { test, describe, it, beforeEach, mock } = require('node:test');
const assert = require('node:assert/strict');

const sumArray = (arr) => {
  return arr.reduce((a, b) => a + b, 0)
}

describe("Spies test: it should call sumArray function with arguments", async () => {
  it("some test", async (t) => {

    const spy = mock.fn(sumArray)
    assert.strictEqual(spy([1, 5, 3]), 9)
    assert.strictEqual(spy.mock.calls.length, 1)

    const call = spy.mock.calls[0]
    assert.deepEqual(call.arguments[0], [1, 5, 3])
    assert.strictEqual(call.result, 9)
  })
})

test('example test', () => {
  assert.equal(1, 1)
})

// test('todo option with message', { todo: 'this is a todo test' }, (t) => {
//   throw new Error('this does not fail the test');
// });

test.skip("Skipping tests", () => {
  assert.notEqual(1, 2)
})

describe("tests colection", () => {
  describe("c1", () => {
    it("case 1", () => {
      assert.notEqual(1, 2)
    })
    it("case 2", () => {
      assert.ok(2 + 2 === 4)
    })
  })

  describe("c2", () => {
    it("case 1", () => {
      assert.deepEqual({ name: "pedro", lastname: "perez" }, { name: "pedro", lastname: "perez" })
    })
    it("case 2", () => {
      assert.notEqual(1, 2)
    })
  })
})