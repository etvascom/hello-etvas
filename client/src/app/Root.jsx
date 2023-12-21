import React, { useEffect, useState } from 'react'
import isPropValid from '@emotion/is-prop-valid'
import { StyleSheetManager } from 'styled-components'
import {
  ThemeProvider,
  BrandingProvider,
  EmbededAppReporter,
  GlobalStyle,
} from '@etvas/etvaskit'
import { I18nProvider } from '@etvas/i18n'

import { i18nService } from '@shared/i18n'
import Router from './navigation/Router'
import ApiProvider from './services/ApiProvider'
import NavProvider from './navigation/NavProvider'
import { AuthorizingOrUnauthorized } from './components'

import client from './services/client'

const Root = () => {
  const [authorizeData, setAuthorizeData] = useState({
    loading: true,
    isAuthorized: false,
  })

  const authorize = async () => {
    try {
      await client.get('/validate-token')
      setAuthorizeData({
        isAuthorized: true,
        loading: false,
      })
    } catch (error) {
      setAuthorizeData({
        isAuthorized: false,
        loading: false,
      })
    }
  }

  useEffect(() => {
    authorize()
  }, [])

  const { loading, isAuthorized } = authorizeData

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <I18nProvider i18nService={i18nService}>
        <BrandingProvider>
          <ThemeProvider>
            <EmbededAppReporter>
              <GlobalStyle />
              {loading || !isAuthorized ? (
                <AuthorizingOrUnauthorized loading={loading} />
              ) : (
                <ApiProvider>
                  <NavProvider>
                    <Router />
                  </NavProvider>
                </ApiProvider>
              )}
            </EmbededAppReporter>
          </ThemeProvider>
        </BrandingProvider>
      </I18nProvider>
    </StyleSheetManager>
  )
}

export default Root

function shouldForwardProp(propName, target) {
  if (typeof target === 'string') {
    return isPropValid(propName)
  }

  return true
}
