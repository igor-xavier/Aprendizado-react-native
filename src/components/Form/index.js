import {React, useState} from "react";
import {Text, TextInput, View, TouchableOpacity, Vibration, Pressable, Keyboard} from "react-native"
import ResultImc from "./ResultImc";
import styles from "./style";
export default function Form(){

    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [messageImc, setMessageImc] = useState("Preencha o peso e altura")
    const [imc, setImc] = useState(null)
    const [textButton, setTextButton] = useState("Calcular")
    const [errorMessage, setErrorMessage] = useState(null)


function imcCalculator(){
    let heightFormat = height.replace(",",".")
    let weightFormat = weight.replace(",",".")
    return setImc((weightFormat/(heightFormat*heightFormat)).toFixed(2))
}

function verificationImc(){
    if (imc == null){
        setErrorMessage("Campo obrigatório*")
        Vibration.vibrate();
    }
    
}

function validationImc(){
    if(height !== null && weight !== null){
        imcCalculator()
        setHeight(null)
        setWeight(null)
        setMessageImc("Seu imc é igual a: ")
        setTextButton("Calcular novamente")
        setErrorMessage(null)
        return
    }
    verificationImc()
    setImc(null)
    setTextButton("Calcular")
    setMessageImc("Preencha o peso e altura")

}

    return(
        <Pressable onPress={Keyboard.dismiss} style={styles.formContext}>
            <View style={styles.form}>
                <Text style={styles.formLabel}>Altura:</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput style={styles.input}
                    onChangeText={setHeight}
                    value={height}
                    placeholder="Ex: 1.75"
                    keyboardType="numeric"
                />
                <Text style={styles.formLabel}>Peso:</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput style={styles.input} 
                    onChangeText={setWeight}
                    value={weight}
                    placeholder="Ex: 80.250"
                    keyboardType="numeric"   
                />
                <TouchableOpacity style={styles.buttonCalculator}
                    onPress={()=> {
                        validationImc()}
                    }>
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </View>
            <ResultImc messageResultImc={messageImc} resultImc={imc}/>
        </Pressable>
    )
} 