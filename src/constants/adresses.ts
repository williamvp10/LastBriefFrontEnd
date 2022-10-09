import { ChainId, Mumbai,Localhost } from "@usedapp/core"

export type AddressMap = {[chainId: number]: string}

export const SC_ADDRESSSES: AddressMap = {
    [Mumbai.chainId]:`0x8007287BcE84e7C1dD092ba31D4E8C5fDB833D33`,
    [Localhost.chainId]: `0x3e5ac54f27E23784348D6508e967841d1EA260A8`,
}
