const flv = require('../')

test("Find a loop", () => {
  const test = [
    {
      name: "state1",
      automatic: 1000,
      transitions: [
        {
          to: "state2"
        }
      ]
    },
    {
      name: "state2",
      automatic: 500,
      transitions: [
        {
          to: "state1"
        }
      ]
    }
  ]

  expect(flv.hasLoop(test)).toEqual({status: flv.ERROR, message: "LOOP"})

})


test("Loop not found", () => {
  const test = [
    {
      name: "state1",
      automatic: 1000,
      transitions: [
        {
          to: "state2"
        }
      ]
    },
    {
      name: "state2",
      automatic: 500,
      transitions: [
        {
          to: "state3"
        }
      ]
    }
  ]

  expect(flv.hasLoop(test)).toEqual({status: flv.SUCCESS, message: "OK"})

})