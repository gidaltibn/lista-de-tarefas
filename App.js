import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Modal, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';

export default function App() {

  const [listaTarefas, setListaTarefas] = useState([{
    id: 1,
    tarefa: "Tarefa 1",
    situacao: "A fazer"
  }]);
  const [tarefa, setTarefa] = useState("");

  function criaItemLista(tarefa) {
    const item = {
      id: Math.random().toString(),
      tarefa: tarefa,
      situacao: "A fazer"
    }

    setListaTarefas([...listaTarefas, item]);
  }

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.tituloContainer}>
        <Text style={styles.tituloText}>Lista de Tarefas</Text>
      </View>
      <View style={styles.conteudoContainer}>
        <View style={styles.listaContainer}>
          <FlatList
            data={listaTarefas}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                  Alert.alert("O que deseja fazer?", "Selecione uma opção", [
                    {
                      text: "Concluir",
                      onPress: () => {
                        const lista = listaTarefas.map((tarefa) => {
                          if (tarefa.id === item.id) {
                            tarefa.situacao = "Concluída";
                          }
                          return tarefa;
                        });
                        setListaTarefas(lista);
                      }
                    },
                    {
                      text: "Excluir",
                      onPress: () => {
                        const lista = listaTarefas.filter((tarefa) => tarefa.id !== item.id);
                        setListaTarefas(lista);
                      }
                    },
                    {
                      text: "Cancelar",
                      onPress: () => { }
                    }
                  ]);
                }}
              >
                <Text>{item.tarefa}</Text>
                <Text>{item.situacao}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.adicionarTarefaButton}>
          <Text style={styles.adicionarTarefaText}>Adicionar tarefa</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.camposContainer}>
        <Text style={styles.camposText}>Tarefa</Text>
        <Text style={styles.camposText}>Situação</Text>
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.tituloModalText}>Adicionar tarefa</Text>
          <TextInput placeholder="Tarefa" onChangeText={(texto) => setTarefa(texto)} style={styles.textInput} />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={() => {
                criaItemLista(tarefa);
                setModalVisible(false);
              }}
              style={styles.adicionarTarefaButton}
            >
              <Text style={styles.adicionarTarefaText}>Adicionar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
              style={styles.adicionarTarefaButton}
            >
              <Text style={styles.adicionarTarefaText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: "8%",
  },
  tituloContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: '100%',
    height: '10%',
    backgroundColor: 'blue',
  },
  tituloText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  adicionarTarefaButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    padding: 10,
    width: "40%",
    height: "8%",
    borderRadius: 10,
    alignSelf: "flex-end",
    marginRight: "5%",
    marginTop: "5%",
  },
  adicionarTarefaText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  conteudoContainer: {
    padding: '5%',
    width: '100%',
    height: '95%',
    backgroundColor: '#EEE',
  },
  camposContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "5%",
    paddingHorizontal: "7%",
    borderRadius: 5,
    width: "80%",
    height: 50,
    elevation: 5,
    backgroundColor: "white",
    position: "absolute",
    top: "12%",
    alignSelf: "center",
    alignItems: "center",
  },
  camposText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  listaContainer: {
    backgroundColor: "#FEFEFE",
    width: '100%',
    height: '80%',
    borderRadius: 10,
    marginTop: "8%",
    marginBottom: "8%",
    paddingTop: "5%",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    paddingHorizontal: "7%",
    borderRadius: 10,
    width: "90%",
    height: 40,
    alignItems: "center",
    backgroundColor: "#EEEEFF",
    elevation: 5,
    alignSelf: "center",
  },
  modalContainer: {
    backgroundColor: "#eee",
    padding: '5%',
    width: '70%',
    height: '40%',
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: "40%",
    borderRadius: 10,
    elevation: 10,
  },
  tituloModalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: "15%",
  },
  textInput: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
    height: 40,
    marginBottom: 5,
    paddingHorizontal: "5%",
    backgroundColor: "white",
  },
  adicionarTarefaButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    padding: 10,
    width: "40%",
    height: 40,
    borderRadius: 10,
    alignSelf: "flex-end",
  },
  adicionarTarefaText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "5%",
    alignSelf: "center",
  },
});
