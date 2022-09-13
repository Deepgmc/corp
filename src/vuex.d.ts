import { Store } from 'vuex'
import { ICompanyState } from '@/types/StoreTypes'

declare module '@vue/runtime-core' {
  interface State {
    company: ICompanyState
  }

  interface ComponentCustomProperties {
    $store: Store<State>,
    $refs: Array<any>
  }
}