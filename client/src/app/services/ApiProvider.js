import React, {
  createContext,
  useEffect,
  useCallback,
  useReducer,
  useState,
} from 'react'
import { dataReducer, ACTION_TYPES, INITIAL_STATE } from './dataReducer'

import client from './client'

const ApiProvider = ({ children, ...props }) => {
  const [{ customer }, dispatch] = useReducer(dataReducer, INITIAL_STATE)
  const [isFetchingCustomer, setFetchingCustomer] = useState(false)

  const storeCustomer = customerProfile =>
    dispatch({
      type: ACTION_TYPES.customerStored,
      payload: customerProfile,
    })

  const fetchCustomer = useCallback(async () => {
    setFetchingCustomer(true)
    try {
      const response = await client.get('/customer')
      storeCustomer(response?.data)
    } catch (err) {
      console.error('* Error fetching customer', err.response?.data || err)
    } finally {
      setFetchingCustomer(false)
    }
  }, [])

  useEffect(() => {
    if (!isFetchingCustomer && customer === null) {
      fetchCustomer()
    }
  }, [fetchCustomer, customer, isFetchingCustomer])

  return (
    <ApiContext.Provider
      value={{
        customer,
        fetchCustomer,
        isFetchingCustomer,
        ...props,
      }}>
      {children}
    </ApiContext.Provider>
  )
}

export const ApiContext = createContext()

export default ApiProvider
