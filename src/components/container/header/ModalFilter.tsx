import { HStack, IconButton, Button, Heading, Input, Box, Modal } from 'native-base'
import { ModalFilterProps } from '../../../types/app'

const ModalFilter: React.FC<ModalFilterProps> = ({isOpen, onClose}) => {

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<Modal.Content width="85%" height="90%">
					<Modal.CloseButton />
					<Modal.Header fontSize="4xl" fontWeight="bold" >
						<Heading size="xl" color="#800040">Filtrar</Heading>
					</Modal.Header>
					<Modal.Body>
						<Box>
							<Heading size="md">Categorias</Heading>
						</Box>
					</Modal.Body>
					<Modal.Footer justifyContent="center">
						<Button w="100%" bg="black" onPress={onClose}>
							Filtrar
						</Button>
					</Modal.Footer>
				</Modal.Content>
			</Modal>
		</>
	)
}

export default ModalFilter