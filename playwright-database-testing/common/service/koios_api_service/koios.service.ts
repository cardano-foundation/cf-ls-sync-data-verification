import { koiosApi } from "./koios.api";
import { KoiosGetTipInformationDto } from "@common/dtos/koios/koios-get-tip-information.dto";
import { KoiosGetAccountAddressesDto } from "@common/dtos/koios/koios-get-account-addresses.dto";
import { KoiosGetEpochProtocolParametersDto } from "@common/dtos/koios/koios-get-epoch-protocol-parameters.dto";

export async function koiosService() {
  const getTip = async () => {
    const getTipData = await koiosApi().getTip();
    const getTipArrayResponse: KoiosGetTipInformationDto[] = await getTipData.data;
    return getTipArrayResponse;
  };

  const getAccountAddresses = async (stakeAddresses: string[]): Promise<string[]> => {
    const getAccountAddressesData = await koiosApi().getAccountAddresses(stakeAddresses);
    const getAccountAddressesArrayResponse: KoiosGetAccountAddressesDto[] = await getAccountAddressesData.data;
    const accountAddresses: string[] = getAccountAddressesArrayResponse.map((addressDto) => addressDto.addresses);
    return accountAddresses;
  };

  const getEpochParameter = async (number: number): Promise<string[]> => {
    const getEpochProtocolParameterData = await koiosApi().getEpochParameter(number);
    const getEpochProtocolParameterDataArrayResponse: KoiosGetEpochProtocolParametersDto[] =
      await getEpochProtocolParameterData.data;
    const epochParameter: string[] = getEpochProtocolParameterDataArrayResponse.map((epoch) => JSON.stringify(epoch));
    return epochParameter;
  };

  return {
    getTip,
    getAccountAddresses,
    getEpochParameter,
  };
}
