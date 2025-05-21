import React, { createContext, useContext } from 'react'
import { defineAbilityFor } from '../ability' // ability.js の関数をインポート

const AbilityContext = createContext() // Ability用のContext作成

// Provider：App全体に ability を共有する
export const AbilityProvider = ({ user, children }) => {
  const ability = defineAbilityFor(user) // ユーザーに応じた権限を定義

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  )
}

// カスタムフック：各コンポーネントで使えるように
export const useAbility = () => {
  return useContext(AbilityContext)
}
