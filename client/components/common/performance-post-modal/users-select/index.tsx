import React, { memo } from 'react';
import { Query } from 'react-apollo';

import { GET_USERS_CURSOR } from '_apollo/queries';
import { Options, Role, UsersDataCursor } from '_client/types';
import { mapSpeakerToOption } from '_client/utils';

import { AutocompleteSelect, Props as SelectProps } from '../../autocomplete-select';


type Props = SelectProps & { isCreateMode: boolean };

const USERS_LIMIT = 100;

export const UsersSelect = memo(({ defaultValue, isCreateMode, ...other }: Props) => (
    <Query query={GET_USERS_CURSOR} variables={{ limit: USERS_LIMIT, sequelizeWhere: { role: Role.Student } }}>
        {({ data }: { data: UsersDataCursor }) => {
            const usersOptions: Options = data?.getUsersCursor?.map(mapSpeakerToOption);

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
