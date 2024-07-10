import { View, Text, ImageBackground, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import { MyHeader, MyRadio } from '../../components';
import { colors, fonts } from '../../utils';

const questions = [
    // NOMOR 1
    {
        question: 'Bagian tumbuhan yang berfungsi untuk fotosintesis adalah...',
        options: [
            { label: 'a. Akar', value: 0 },
            { label: 'b. Batang', value: 1 },
            { label: 'c. Daun', value: 2 },
            { label: 'd. Bunga', value: 3 }
        ],
        correctAnswer: 2
    },

    // NOMOR 2
    {
        question: 'Alat kelamin jantan pada bunga disebut...',
        options: [
            { label: 'a. Putik', value: 0 },
            { label: 'b. Benang Sari', value: 1 },
            { label: 'c. Kelompok', value: 2 },
            { label: 'd. Mahkota', value: 3 }
        ],
        correctAnswer: 1
    },

    //NOMOR 3
    {
        question: 'Proses pembuatan makanan pada tumbuhan disebut...',
        options: [
            { label: 'a. Respirasi', value: 0 },
            { label: 'b. Transpirasi', value: 1 },
            { label: 'c. Fotosintesis', value: 2 },
            { label: 'd. Fermentasi', value: 3 }
        ],
        correctAnswer: 2
    },

    //NOMOR 4
    {
        question: 'Gas yang digunakan tumbuhan untuk fotosintesis adalah...',
        options: [
            { label: 'a. Oksigen', value: 0 },
            { label: 'b. Karbon dioksida', value: 1 },
            { label: 'c. Nitrogen', value: 2 },
            { label: 'd. Hidrogen', value: 3 }
        ],
        correctAnswer: 1
    },

     //NOMOR 5
     {
        question: 'Tumbuhan yang hidup di air disebut...',
        options: [
            { label: 'a. Terestrial', value: 0 },
            { label: 'b. Epifit', value: 1 },
            { label: 'c. Akuatik', value: 2 },
            { label: 'd. Parasitis', value: 3 }
        ],
        correctAnswer: 2
    },

      //NOMOR 6
      {
        question: 'Bagian bunga yang berkembang menjadi buah adalah...',
        options: [
            { label: 'a. Putik', value: 0 },
            { label: 'b. Benang sari', value: 1 },
            { label: 'c. Daun', value: 2 },
            { label: 'd. Batang', value: 3 }
        ],
        correctAnswer: 0
    },


      //NOMOR 7
      {
        question: 'Zat hijau daun yang berperan dalam fotosintesis adalah...',
        options: [
            { label: 'a. Hemoglobin', value: 0 },
            { label: 'b. Klorofil', value: 1 },
            { label: 'c. Melanin', value: 2 },
            { label: 'd. Karoten', value: 3 }
        ],
        correctAnswer: 1
    },


      //NOMOR 8
      {
        question: 'Akar yang tumbuh ke samping dan berfungsi sebagai penyangga adalah...',
        options: [
            { label: 'a. Akar serabut', value: 0 },
            { label: 'b. Akar tunggang', value: 1 },
            { label: 'c. Akar napas', value: 2 },
            { label: 'd. Akar gantung', value: 3 }
        ],
        correctAnswer: 0
    },


      //NOMOR 9
      {
        question: 'Bagian tumbuhan yang berfungsi menyerap air dan mineral dari tanah adalah...',
        options: [
            { label: 'a. Daun', value: 0 },
            { label: 'b. Batang', value: 1 },
            { label: 'c. Akar', value: 2 },
            { label: 'd. Bunga', value: 3 }
        ],
        correctAnswer: 2
    },


      //NOMOR 10
      {
        question: 'Bagian bunga yang berfungsi menarik perhatian serangga adalah…',
        options: [
            { label: 'a. Kelopak', value: 0 },
            { label: 'b. Mahkota', value: 1 },
            { label: 'c. Putik', value: 2 },
            { label: 'd. Benang sari', value: 3 }
        ],
        correctAnswer: 1
    },


     // NOMOR 11
     {
        question: 'Tumbuhan yang daunnya selalu hijau sepanjang tahun disebut...',
        options: [
            { label: 'a. Tumbuhan semusim', value: 0 },
            { label: 'b. Tumbuhan meranggas', value: 1 },
            { label: 'c. Tumbuhan gugur', value: 2 },
            { label: 'd. Tumbuhan evergreen', value: 3 }
        ],
        correctAnswer: 3
    },

    // NOMOR 12
    {
        question: 'Proses penguapan air dari daun disebut...',
        options: [
            { label: 'a. Respirasi', value: 0 },
            { label: 'b. Transpirasi', value: 1 },
            { label: 'c. Fotosintesis', value: 2 },
            { label: 'd. Fermentasi', value: 3 }
        ],
        correctAnswer: 1
    },

    //NOMOR 13
    {
        question: 'Bagian biji yang pertama kali tumbuh menjadi akar disebut...',
        options: [
            { label: 'a. Epikotil', value: 0 },
            { label: 'b. Kotiledon', value: 1 },
            { label: 'c. Radikula', value: 2 },
            { label: 'd. Plumula', value: 3 }
        ],
        correctAnswer: 2
    },

    //NOMOR 14
    {
        question: 'Tumbuhan yang menghasilkan bunga disebut...',
        options: [
            { label: 'a. Paku-pakuan', value: 0 },
            { label: 'b. Lumut', value: 1 },
            { label: 'c. Gymnospermae', value: 2 },
            { label: 'd. Angiospermae', value: 3 }
        ],
        correctAnswer: 3
    },

     //NOMOR 15
     {
        question: 'Buah yang berkembang dari satu bunga dengan satu putik disebut...',
        options: [
            { label: 'a. Buah majemuk', value: 0 },
            { label: 'b. Buah agregat', value: 1 },
            { label: 'c. Buah tunggal', value: 2 },
            { label: 'd. Buah palsu', value: 3 }
        ],
        correctAnswer: 2
    },

      //NOMOR 16
      {
        question: 'Tumbuhan yang tidak berbunga disebut...',
        options: [
            { label: 'a. Paku-pakuan', value: 0 },
            { label: 'b. Angiospermae', value: 1 },
            { label: 'c. Gymnospermae', value: 2 },
            { label: 'd. Lumut', value: 3 }
        ],
        correctAnswer: 2
    },


      //NOMOR 17
      {
        question: 'Fungsi stomata pada daun adalah untuk...',
        options: [
            { label: 'a. Menyerap air', value: 0 },
            { label: 'b. Menyimpan cadangan makanan', value: 1 },
            { label: 'c. Tempat pertukaran gas', value: 2 },
            { label: 'd. Menyimpan air', value: 3 }
        ],
        correctAnswer: 2
    },


      //NOMOR 18
      {
        question: 'Tumbuhan yang menyerap air dari udara menggunakan akar gantung adalah...',
        options: [
            { label: 'a. Anggrek', value: 0 },
            { label: 'b. Padi', value: 1 },
            { label: 'c. Jagung', value: 2 },
            { label: 'd. Tebu', value: 3 }
        ],
        correctAnswer: 0
    },


      //NOMOR 19
      {
        question: 'Tumbuhan yang berkembang biak dengan spora adalah...',
        options: [
            { label: 'a. Jagung', value: 0 },
            { label: 'b. Paku-pakuan', value: 1 },
            { label: 'c. Mangga', value: 2 },
            { label: 'd. Anggrek', value: 3 }
        ],
        correctAnswer: 1
    },


      //NOMOR 20
      {
        question: 'Hasil fotosintesis pada tumbuhan adalah...',
        options: [
            { label: 'a. Karbon dioksida dan air', value: 0 },
            { label: 'b. Glukosa dan oksigen', value: 1 },
            { label: 'c. Oksigen dan nitrogen', value: 2 },
            { label: 'd. Glukosa dan karbon dioksida', value: 3 }
        ],
        correctAnswer: 1
    },



];

export default function TingkatSatu({ navigation }) {
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
