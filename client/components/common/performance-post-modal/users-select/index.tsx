import React, { memo } from 'react';
import { Query } from 'react-apollo';

import { GET_USERS } from 'apollo/queries';
import { Options, UsersData } from 'client/types';
import { mapSpeakerToOption } from 'client/utils';
import { AutocompleteSelect, Props as SelectProps } from '../../autocomplete-select';


type Props = SelectProps & { isCreateMode: boolean };

const USERS_LIMIT = 100;

export const UsersSelect = memo(({ defaultValue, isCreateMode, ...other }: Props) => (
    <Query query={GET_USERS} variables={{ limit: USERS_LIMIT }}>
        {({ data }: { data: UsersData }) => {
            const usersOptions: Options = data?.getUsers?.map(mapSpeakerToOption);

            return (
                <AutocompleteSelect
                    {...other}
                    defaultValue={defaultValue}
                    options={usersOptions}
                />
            );
        }}
    </Query>
));
