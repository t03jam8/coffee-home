import React, { FunctionComponent } from "react"
import { HeaderComponent } from "../../components/HeaderComponent"
import { Container } from "native-base"
import {
  SystemContent,
  SystemFlex,
  SystemSpace,
  SystemText
} from "../../system-components"
import styled from "../../system-components/system-theme/styled-components"
import { View } from "react-native"
import { ScrollView } from "react-native"
import { REGULAR, MEDIUM } from "../../system-components/system-theme/theme"
import { SystemTouch } from "../../system-components/SystemTouch"
import { ArrowUpPrimary, ArrowDownBlack } from "../../assets"
import { selectLightGrey } from "../../utils/selectors"

const SelectedLocationBox = styled(View)`
width: 20
height: 20
`

const PointCardContainer = styled(View)`
  width: 100%;
  background-color: ${selectLightGrey};
`

const SettingsTag = ({ title, primaryActive }) => {
  return (
    <PointCardContainer>
      <SystemSpace size={REGULAR} />
      <SystemFlex row={true} align="center" justify="space-between">
        <SystemFlex noFlex row>
          <SystemSpace size={MEDIUM} />
          <SystemText size={20}>{title}</SystemText>
        </SystemFlex>

        <SystemFlex noFlex row align="center">
          {primaryActive ? (
            <SystemTouch onPress={() => true}>
              <ArrowUpPrimary />
            </SystemTouch>
          ) : (
            <SystemTouch onPress={() => true}>
              <ArrowDownBlack />
            </SystemTouch>
          )}

          <SystemSpace size={MEDIUM} />
        </SystemFlex>
      </SystemFlex>
      <SystemSpace size={REGULAR} />
    </PointCardContainer>
  )
}

export const SettingsScreen: FunctionComponent = () => {
  return (
    <Container>
      <HeaderComponent RightIcon={View}>Settings</HeaderComponent>
      <SystemContent fill>
        <ScrollView>
          <SystemFlex>
            <SystemSpace size={REGULAR} />
            <SettingsTag title="Private policy" primaryActive={true} />
            <SystemSpace size={REGULAR} />
            <SettingsTag title="Model usage" primaryActive={true} />
            <SystemSpace size={REGULAR} />
            <SettingsTag title="Contact" primaryActive={true} />
            <SystemSpace size={REGULAR} />
          </SystemFlex>
        </ScrollView>
      </SystemContent>
    </Container>
  )
}
