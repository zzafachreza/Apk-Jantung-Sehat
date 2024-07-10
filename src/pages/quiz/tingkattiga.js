import { View, Text, ImageBackground, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import { MyHeader, MyRadio } from '../../components';
import { colors, fonts } from '../../utils';

const questions = [
    // NOMOR 1
    {
        question: 'Hormon tumbuhan yang berperan dalam pembukaan stomata adalah...',
        options: [
            { label: 'Asam absisat', value: 0 },
            { label: 'Auksin', value: 1 },
            { label: 'Giberelin', value: 2 },
            { label: 'Sitokinin', value: 3 }
        ],
        correctAnswer: 1
    },

    // NOMOR 2
    {
        question: 'Proses dimana sel-sel meristem berubah menjadi jaringan dewasa disebut...',
        options: [
            { label: 'Diferensiasi', value: 0 },
            { label: 'Dediferensiasi', value: 1 },
            { label: 'Morfogenesis', value: 2 },
            { label: 'Organogenesis', value: 3 }
        ],
        correctAnswer: 0
    },

    // NOMOR 3
    {
        question: 'Jaringan yang berfungsi sebagai tempat cadangan makanan adalah...',
        options: [
            { label: 'Sklerenkim', value: 0 },
            { label: 'Kolenkim', value: 1 },
            { label: 'Parenkim', value: 2 },
            { label: 'Floem', value: 3 }
        ],
        correctAnswer: 2
    },

    // NOMOR 4
    {
        question: 'Reaksi terang fotosintesis terjadi di...',
        options: [
            { label: 'Stroma', value: 0 },
            { label: 'Grana', value: 1 },
            { label: 'Membran tilakoid', value: 2 },
            { label: 'Sitoplasma', value: 3 }
        ],
        correctAnswer: 1
    },

    // NOMOR 5
    {
        question: 'Gas yang dihasilkan pada reaksi terang fotosintesis adalah...',
        options: [
            { label: 'Oksigen', value: 0 },
            { label: 'Karbon dioksida', value: 1 },
            { label: 'Nitrogen', value: 2 },
            { label: 'Hidrogen', value: 3 }
        ],
        correctAnswer: 0
    },

    // NOMOR 6
    {
        question: 'Enzim yang berperan dalam fiksasi karbon pada fotosintesis adalah...',
        options: [
            { label: 'Rubisko', value: 0 },
            { label: 'ATPase', value: 1 },
            { label: 'Kinase', value: 2 },
            { label: 'Amilase', value: 3 }
        ],
        correctAnswer: 0
    },

    // NOMOR 7
    {
        question: 'Hormon yang merangsang pematangan buah adalah...',
        options: [
            { label: 'Sitokinin', value: 0 },
            { label: 'Giberelin', value: 1 },
            { label: 'Etilen', value: 2 },
            { label: 'Auksin', value: 3 }
        ],
        correctAnswer: 2
    },

    // NOMOR 8
    {
        question: 'Jaringan yang mengangkut hasil fotosintesis dari daun ke seluruh tubuh tumbuhan adalah...',
        options: [
            { label: 'Xilem', value: 0 },
            { label: 'Floem', value: 1 },
            { label: 'Kambium', value: 2 },
            { label: 'Meristem', value: 3 }
        ],
        correctAnswer: 1
    },

    // NOMOR 9
    {
        question: 'Proses pengangkutan air dari akar ke daun melalui xilem disebut...',
        options: [
            { label: 'Translokasi', value: 0 },
            { label: 'Transpirasi', value: 1 },
            { label: 'Osmosis', value: 2 },
            { label: 'Difusi', value: 3 }
        ],
        correctAnswer: 1
    },

    // NOMOR 10
    {
        question: 'Sel-sel yang mengatur pembukaan dan penutupan stomata adalah...',
        options: [
            { label: 'Sel penjaga', value: 0 },
            { label: 'Sel epidermis', value: 1 },
            { label: 'Sel mesofil', value: 2 },
            { label: 'Sel palisade', value: 3 }
        ],
        correctAnswer: 0
    },

    // NOMOR 11
    {
        question: 'Proses penyerapan air oleh akar melalui rambut akar adalah...',
        options: [
            { label: 'Osmosis', value: 0 },
            { label: 'Difusi', value: 1 },
            { label: 'Transpirasi', value: 2 },
            { label: 'Translokasi', value: 3 }
        ],
        correctAnswer: 0
    },

    // NOMOR 12
    {
        question: 'Jaringan pada akar yang berfungsi untuk menyimpan cadangan makanan adalah...',
        options: [
            { label: 'Korteks', value: 0 },
            { label: 'Epidermis', value: 1 },
            { label: 'Endodermis', value: 2 },
            { label: 'Xilem', value: 3 }
        ],
        correctAnswer: 0
    },

    // NOMOR 13
    {
        question: 'Proses dimana tumbuhan mengubah nitrogen bebas menjadi bentuk yang dapat diserap oleh akar adalah...',
        options: [
            { label: 'Fiksasi nitrogen', value: 0 },
            { label: 'Denitrifikasi', value: 1 },
            { label: 'Nitrifikasi', value: 2 },
            { label: 'Amonifikasi', value: 3 }
        ],
        correctAnswer: 0
    },

    // NOMOR 14
    {
        question: 'Bagian daun yang mengandung jaringan mesofil adalah...',
        options: [
            { label: 'Epidermis atas', value: 0 },
            { label: 'Epidermis bawah', value: 1 },
            { label: 'Palisade dan spons', value: 2 },
            { label: 'Stomata', value: 3 }
        ],
        correctAnswer: 2
    },

    // NOMOR 15
    {
        question: 'Hormon yang berperan dalam pembelahan sel adalah...',
        options: [
            { label: 'Auksin', value: 0 },
            { label: 'Sitokinin', value: 1 },
            { label: 'Giberelin', value: 2 },
            { label: 'Etilen', value: 3 }
        ],
        correctAnswer: 1
    },

    // NOMOR 16
    {
        question: 'Fungsi utama dari jaringan epidermis pada tumbuhan adalah...',
        options: [
            { label: 'Menyerap air dan nutrisi', value: 0 },
            { label: 'Melakukan fotosintesis', value: 1 },
            { label: 'Melindungi dari kerusakan fisik dan kehilangan air', value: 2 },
            { label: 'Menyimpan cadangan makanan', value: 3 }
        ],
        correctAnswer: 2
    },

    // NOMOR 17
    {
        question: 'Proses penyerbukan dimana serbuk sari jatuh pada kepala putik bunga yang sama disebut...',
        options: [
            { label: 'Penyerbukan silang', value: 0 },
            { label: 'Penyerbukan sendiri', value: 1 },
            { label: 'Penyerbukan bastar', value: 2 },
            { label: 'Penyerbukan alami', value: 3 }
        ],
        correctAnswer: 1
    },

    // NOMOR 18
    {
        question: 'Hormon yang merangsang perkecambahan biji adalah...',
        options: [
            { label: 'Auksin', value: 0 },
            { label: 'Sitokinin', value: 1 },
            { label: 'Giberelin', value: 2 },
            { label: 'Etilen', value: 3 }
        ],
        correctAnswer: 2
    },

    // NOMOR 19
    {
        question: 'Proses dimana air keluar dari tumbuhan melalui stomata disebut...',
        options: [
            { label: 'Evaporasi', value: 0 },
            { label: 'Transpirasi', value: 1 },
            { label: 'Gutasi', value: 2 },
            { label: 'Respirasi', value: 3 }
        ],
        correctAnswer: 1
    },

    // NOMOR 20
    {
        question: 'Struktur yang menghubungkan akar dengan daun dalam proses pengangkutan air adalah...',
        options: [
            { label: 'Floem', value: 0 },
            { label: 'Korteks', value: 1 },
            { label: 'Xilem', value: 2 },
            { label: 'Epidermis', value: 3 }
        ],
        correctAnswer: 2
    }
];

export default function TingkatTiga({ navigation }) {
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
