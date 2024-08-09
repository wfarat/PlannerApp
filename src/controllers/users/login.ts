import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { login } from '@/services/users';
import { LoginResponse, LoginVariables } from '@/types/schemas/user';

export default (): UseMutationResult<LoginResponse, Error, LoginVariables> => {
	return useMutation({
		mutationFn: ({ username, password }: LoginVariables) => {
			return login(username, password);
		},
	});
};
