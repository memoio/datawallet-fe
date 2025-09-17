
import axios from 'axios';
import { API_URL } from "../config/config";

export async function createDID(address: string) {
    const response = await axios.post(
        API_URL.CREATE_DID,
        {
            evm_address: address
        },
        {
            headers: {
                "accept": "application/hal+json",
                "Content-Type": "application/json",
            },
        }
    );

    if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}: ${response.data}`);
    }

    if (response.data.result !== 1) {
        throw new Error(`${response.data.message_en}`);
    }
}