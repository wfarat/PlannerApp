import { View, TextInput } from 'react-native';

import { useTranslation } from 'react-i18next';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { useEffect, useState } from 'react';
import GoalsList from '@/screens/Goals/GoalsList';
import { RootScreenProps } from '@/types/navigation';
import { useStorage } from '@/storage/StorageContext';
import { NameAndDescription } from '@/types/schemas';

function Goals({ navigation, route }: RootScreenProps<'Goals'>) {
	const { t } = useTranslation(['goals']);
	const storage = useStorage();
	const { layout, gutters, components } = useTheme();
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	useEffect(() => {
		const savedState = storage.getString('goals.state');
		if (savedState) {
			const data = JSON.parse(savedState) as NameAndDescription;
			setName(data.name);
			setDescription(data.description);
		}
	}, []);
	useEffect(() => {
		storage.set('goals.state', JSON.stringify({ name, description }));
	}, [name, description]);
	const clean = () => {
		setDescription('');
		setName('');
	};
	return (
		<SafeScreen>
			<View
				style={[
					layout.justifyCenter,
					layout.itemsCenter,
					gutters.marginTop_120,
				]}
			>
				<View style={[gutters.paddingHorizontal_32]}>
					<View>
						<TextInput
							style={components.textInputRounded}
							value={name}
							onChangeText={setName}
							placeholder={t('goals:title')}
						/>

						<TextInput
							style={components.textInputRounded}
							multiline
							value={description}
							onChangeText={setDescription}
							placeholder={t('goals:description')}
						/>
					</View>
					<GoalsList navigation={navigation} route={route} clean={clean} />
				</View>
			</View>
		</SafeScreen>
	);
}

export default Goals;
