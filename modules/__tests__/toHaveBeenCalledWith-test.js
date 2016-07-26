import expect, { createSpy } from '../index'

describe('toHaveBeenCalledWith', () => {
  it('accepts exaclty equal arguments', () => {
    const spy = createSpy()
    spy('test')
    spy('two', 'arguments')

    expect(spy).toHaveBeenCalledWith('test')
    expect(spy).toHaveBeenCalledWith('two', 'arguments')
  })

  it('accepts matching arguments', () => {
    const spy = createSpy()
    spy(1, 'first call')
    spy(2, 'second call')

    expect(spy).toHaveBeenCalledWith(1, /call/)
    expect(spy).toHaveBeenCalledWith(2, /call/)
  })

  it('makes type matching if constructor function is provided', () => {
    expect(() => {
      const spy = createSpy()
      spy(() => {})
      expect(spy).toHaveBeenCalledWith(Function)
    }).toNotThrow()

    expect(() => {
      const spy = createSpy()
      spy([])
      expect(spy).toHaveBeenCalledWith(Array)
    }).toNotThrow()
  })

  it('throws on not matching arguments', () => {
    const spy = createSpy()
    spy([])
    spy('test')

    expect(() => {
      expect(spy).toHaveBeenCalledWith(false)
    })
  })
})
