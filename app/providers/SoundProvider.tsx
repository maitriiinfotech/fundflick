'use client'

import { createContext, useContext, useRef, useCallback } from 'react'
import { Howl, Howler, HowlOptions } from 'howler'

type SoundMap = Record<string, Howl>

interface SoundContextValue {
  play: (key: string, src: string | string[], options?: HowlOptions) => void
  stop: (key: string) => void
  setVolume: (volume: number) => void
  sounds: React.MutableRefObject<SoundMap>
}

const SoundContext = createContext<SoundContextValue | null>(null)

export function useSound() {
  const ctx = useContext(SoundContext)
  if (!ctx) throw new Error('useSound must be used inside SoundProvider')
  return ctx
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const sounds = useRef<SoundMap>({})

  const play = useCallback((key: string, src: string | string[], options: object = {}) => {
    if (!sounds.current[key]) {
      sounds.current[key] = new Howl({
        src: Array.isArray(src) ? src : [src],
        ...options,
      })
    }
    sounds.current[key].play()
  }, [])

  const stop = useCallback((key: string) => {
    sounds.current[key]?.stop()
  }, [])

  const setVolume = useCallback((volume: number) => {
    Howler.volume(volume)
  }, [])

  return (
    <SoundContext.Provider value={{ play, stop, setVolume, sounds }}>
      {children}
    </SoundContext.Provider>
  )
}
