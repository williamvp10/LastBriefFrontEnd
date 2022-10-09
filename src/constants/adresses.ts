import { ChainId, Mumbai,Localhost } from "@usedapp/core"

export type AddressMap = {[chainId: number]: string}

export const SC_ADDRESSSES: AddressMap = {
    [Mumbai.chainId]:`0x3e5ac54f27E23784348D6508e967841d1EA260A8`,
    [Localhost.chainId]: `0x3e5ac54f27E23784348D6508e967841d1EA260A8`,
}
