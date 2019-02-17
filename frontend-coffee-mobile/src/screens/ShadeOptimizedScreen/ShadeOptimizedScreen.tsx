import React, { FunctionComponent } from "react"
import { HeaderComponent } from "../../components/HeaderComponent"
import { Container } from "native-base"
import { SystemContent } from "../../system-components"
import styled from "../../system-components/system-theme/styled-components"
import { View } from "react-native"

const SelectedLocationBox = styled(View)`
width: 20
height: 20
`
export const ShadeOptimizedScreen: FunctionComponent = () => {
  return (
    <Container>
      <HeaderComponent>Shade Optimized</HeaderComponent>
      <SystemContent fill>
        <SelectedLocationBox />
      </SystemContent>
    </Container>
  )
}
