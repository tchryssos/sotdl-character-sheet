import { useState } from "react"

export const useCharacterActions = () => {
  const [action, setAction] = useState<'reactivate' | 'deactivate' | 'delete' | null>(null)

  const 
}