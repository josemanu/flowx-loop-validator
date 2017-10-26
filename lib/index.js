'use strict'

const _ = require('lodash')

const hasLoop = (flow) => {
  if (Array.isArray(flow)) {
    return _validate(flow)
  } else if (flow.states) {
    return _validate(flow.states)
  }
  return {
    status: "error",
    message: "Flow not found!"
  }
}

const _validate = (states) => {

  const paths = states.reduce((acc, state) => {
    if (state.automatic && state.automatic !== "") {
      if(state.transitions.length > 0){
        acc.push({ from: state.name, to: state.transitions[0].to })
      } else{
        console.error(`Transitions not found in automatic state %j`, state)
      }
    }
    return acc
  }, [])

  while (paths.length > 0) {
    if (validatePath(paths.pop(), paths)) {
      return {
        status: ERROR,
        message: "LOOP"
      }
    }
  }

  return {
    status: SUCCESS,
    message: "OK"
  }
}

const validatePath = (root, path, stack = []) => {
  stack.push(root)
  if (_.find(stack, { from: root.to })) {
    console.log(`LOOP IN STACK => %j`, stack)
    return true
  }
  const next = _.find(path, { from: root.to })
  const newPath = _.remove(path, { from: root.to })
  if (!next) {
    return false
  }
  return validatePath(next, newPath, stack)
}

const ERROR = "error"
const SUCCESS = "sucess"

module.exports = {
  hasLoop,
  ERROR,
  SUCCESS
}