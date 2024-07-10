import { View, Text, ImageBackground, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import { MyHeader, MyRadio } from '../../components';
import { colors, fonts } from '../../utils';

const questions = [
    // NOMOR 1
    {
        question: 'Tempat terjadinya fotosintesis pada daun adalah...',
        options: [
            { label: 'a. Stomata', value: 0 },
            { label: 'b. Mesofil', value: 1 },
            { label: 'c. Epidermis', value: 2 },
            { label: 'd. Xilem', value: 3 }
        ],
        correctAnswer: 1
    },

    // NOMOR 2
    {
        question: 'Jaringan yang mengangkut air dan mineral dari akar ke daun adalah...',
        options: [
            { label: 'a. Floem', value: 0 },
            { label: 'b. Kambium', value: 1 },
            { label: 'c. Korteks', value: 2 },
            { label: 'd. Xilem', value: 3 }
        ],
        correctAnswer: 3
    },

    //NOMOR 3
    {
        question: 'Hormon yang berperan dalam pemanjangan sel pada tumbuhan adalah...',
        options: [
            { label: 'a. Sitokinin', value: 0 },
            { label: 'b. Giberelin', value: 1 },
            { label: 'c. Auksin', value: 2 },
            { label: 'd. Etilen', value: 3 }
        ],
        correctAnswer: 2
    },

    //NOMOR 4
    {
        question: 'Proses pembentukan buah tanpa pembuahan disebut...',
        options: [
            { label: 'a. Partenokarpi', value: 0 },
            { label: 'b. Polinasi', value: 1 },
            { label: 'c. Fertilisasi', value: 2 },
            { label: 'd. Germinasi', value: 3 }
        ],
        correctAnswer: 0
    },

     //NOMOR 5
     {
        question: 'Jaringan pada daun yang mengandung kloroplas adalah...',
        options: [
            { label: 'a. Palisade', value: 0 },
            { label: 'b. Epidermis', value: 1 },
            { label: 'c. Floem', value: 2 },
            { label: 'd. Xilem', value: 3 }
        ],
        correctAnswer: 0
    },

      //NOMOR 6
      {
        question: 'Bagian bunga yang berfungsi melindungi bunga saat masih kuncup adalah...',
        options: [
            { label: 'a. Kelopak', value: 0 },
            { label: 'b. Mahkota', value: 1 },
            { label: 'c. Putik', value: 2 },
            { label: 'd. Benang sari', value: 3 }
        ],
        correctAnswer: 0
    },


      //NOMOR 7
      {
        question: 'Proses penyerbukan yang dibantu oleh angin disebut...',
        options: [
            { label: 'a. Hidrofil', value: 0 },
            { label: 'b. Entomofil', value: 1 },
            { label: 'c. Anemofil', value: 2 },
            { label: 'd. Ornitofil', value: 3 }
        ],
        correctAnswer: 2
    },


      //NOMOR 8
      {
        question: 'Jaringan yang bertugas mengangkut hasil fotosintesis dari daun ke seluruh bagian tumbuhan adalah...',
        options: [
            { label: 'a. Xilem', value: 0 },
            { label: 'b. Floem', value: 1 },
            { label: 'c. Korteks', value: 2 },
            { label: 'd. Epidermis', value: 3 }
        ],
        correctAnswer: 1
    },


      //NOMOR 9
      {
        question: 'Tumbuhan yang menyimpan cadangan makanan di batang adalah',
        options: [
            { label: 'a. Singkong', value: 0 },
            { label: 'b. Wortel', value: 1 },
            { label: 'c. Kentang', value: 2 },
            { label: 'd. Bawang', value: 3 }
        ],
        correctAnswer: 2
    },


      //NOMOR 10
      {
        question: 'Bagian dari bunga yang berkembang menjadi biji adalah...',
        options: [
            { label: 'a. Stigma', value: 0 },
            { label: 'b. Stilus', value: 1 },
            { label: 'c. Ovula', value: 2 },
            { label: 'd. Filamen', value: 3 }
        ],

        correctAnswer: 2
    },


     // NOMOR 11
     {
        question: 'Tumbuhan yang menyimpan cadangan makanan di akar adalah...',
        options: [
            { label: 'a. Kentang', value: 0 },
            { label: 'b. Wortel', value: 1 },
            { label: 'c. Jagung', value: 2 },
            { label: 'd. Padi', value: 3 }
        ],
        correctAnswer: 1
    },

    // NOMOR 12
    {
        question: 'Jaringan yang terdapat pada ujung akar dan ujung batang adalah...',
        options: [
            { label: 'a. Parenkim', value: 0 },
            { label: 'b. Sklerenkim', value: 1 },
            { label: 'c. Meristem', value: 2 },
            { label: 'd. Epidermis', value: 3 }
        ],
        correctAnswer: 2
    },

    //NOMOR 13
    {
        question: 'Tumbuhan yang memiliki bunga sempurna adalah...',
        options: [
            { label: 'a. Jagung', value: 0 },
            { label: 'b. Anggrek', value: 1 },
            { label: 'c. Kelapa', value: 2 },
            { label: 'd. Pepaya', value: 3 }
        ],
        correctAnswer: 1
    },

    //NOMOR 14
    {
        question: 'Sel-sel yang menyusun jaringan angkut floem adalah...',
        options: [
            { label: 'a. Trakeid', value: 0 },
            { label: 'b. Trakea', value: 1 },
            { label: 'c. Sel pengiring', value: 2 },
            { label: 'd. Fermentasi', value: 3 }
        ],
        correctAnswer: 2
    },

     //NOMOR 15
     {
        question: 'Proses dimana tumbuhan menghasilkan energi dari glukosa disebut...',
        options: [
            { label: 'a. Fotosintesis', value: 0 },
            { label: 'b. Respirasi seluler', value: 1 },
            { label: 'c. Transpirasi', value: 2 },
            { label: 'd. Fermentasi', value: 3 }
        ],
        correctAnswer: 1
    },

      //NOMOR 16
      {
        question: 'Jaringan yang berfungsi untuk memperkuat dan mendukung struktur tumbuhan adalah...',
        options: [
            { label: 'a. Kolenkim', value: 0 },
            { label: 'b. Sklerenkim', value: 1 },
            { label: 'c. Parenkim', value: 2 },
            { label: 'd. Epidermis', value: 3 }
        ],
        correctAnswer: 1
    },


      //NOMOR 17
      {
        question: 'Perkembangbiakan vegetatif alami pada tumbuhan terjadi melalui...',
        options: [
            { label: 'a. Biji', value: 0 },
            { label: 'b. Stek', value: 1 },
            { label: 'c. Spora', value: 2 },
            { label: 'd. Tunas', value: 3 }
        ],
        correctAnswer: 2
    },


      //NOMOR 18
      {
        question: 'Fungsi dari lapisan lilin pada daun adalah...',
        options: [
            { label: 'a. Mengurangi penguapan air', value: 0 },
            { label: 'b. Meningkatkan fotosintesis', value: 1 },
            { label: 'c. Menyerap air', value: 2 },
            { label: 'd. Menyimpan nutrisi', value: 3 }
        ],
        correctAnswer: 0
    },


      //NOMOR 19
      {
        question: 'Bagian dari tumbuhan yang berfungsi sebagai alat transportasi air dan nutrisi adalah...',
        options: [
            { label: 'a. Xilem dan floem', value: 0 },
            { label: 'b. Korteks dan epidermis', value: 1 },
            { label: 'c. Stomata dan kutikula', value: 2 },
            { label: 'd. Meristem dan parenkim', value: 3 }
        ],
        correctAnswer: 3
    },


      //NOMOR 20
      {
        question: 'Proses penyerbukan yang dibantu oleh hewan disebut...',
        options: [
            { label: 'a. Hidrofil', value: 0 },
            { label: 'b. Entomofil', value: 1 },
            { label: 'c. Anemofil', value: 2 },
            { label: 'd. Ornitofil', value: 3 }
        ],
        correctAnswer: 1
    },



];

export default function TingkatDua({ navigation }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const backPage = () => {
        navigation.goBack()
    };


    const nextQuestion = () => {
        if (selectedOption === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }

        setSelectedOption(null);
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowScore(true);
        }
    };

    const restartQuiz = () => {
        navigation.replace('Quiz')
    };

    return (
        <ImageBackground source={require('../../assets/bgsplash.png')} style={styles.background}>
            <MyHeader judul="Yuk Coba Quiz Menarik!" onPress={backPage}/>
            {showScore ? (
                <View style={styles.scoreContainer}>
                    <Image source={require('../../assets/badge.png')} style={styles.scoreIcon} />
                    <Text style={styles.scoreText}>Skor Quiz</Text>
                    <Text style={styles.levelText}>Tingkat 1</Text>
                    <Text style={styles.score}>{score * 25}</Text>
                    <TouchableOpacity onPress={restartQuiz} style={styles.button}>
                        <Text style={styles.buttonText}>Kerjakan Soal Lagi</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.questionContainer}>
                        <Text style={styles.questionText}>
                            {currentQuestion + 1}. {questions[currentQuestion].question}
                        </Text>
                        {questions[currentQuestion].options.map((option, index) => (
                            <MyRadio
                                key={index}
                                selected={selectedOption === option.value}
                                onPress={() => setSelectedOption(option.value)}
                                label={option.label}
                            />
                        ))}
                    </View>
                </ScrollView>
            )}
            {!showScore && (
                <View style={styles.containerButton}>
                    <TouchableOpacity onPress={nextQuestion} style={styles.button}>
                        <Text style={styles.buttonText}>
                            {currentQuestion === questions.length - 1 ? 'Selesai' : 'Selanjutnya'}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: "100%"
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20
    },
    questionContainer: {
        marginBottom: 0,
        padding: 20,
        width: '100%',
    },
    questionText: {
        fontSize: 20,
        marginBottom: 20,
        fontFamily: fonts.primary[400],
        color: colors.primary,
        textAlign: "left"
    },
    containerButton: {
        padding: 10
    },
    button: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        marginTop: 0,
        marginBottom: 100
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: fonts.primary[600],
    },
    scoreContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding:10
    },
    scoreIcon: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    scoreText: {
        fontSize: 24,
        fontFamily: fonts.primary[600],
        color: colors.primary,
        marginBottom: 10,
    },
    levelText: {
        fontSize: 20,
        fontFamily: fonts.primary[400],
        color: colors.primary,
        marginBottom: 10,
    },
    score: {
        fontSize: 48,
        fontFamily: fonts.primary[600],
        color: colors.primary,
    }
});
