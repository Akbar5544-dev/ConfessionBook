import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logo: {
        color: colors.text,
        fontSize: 24,
        fontWeight: '800',
        letterSpacing: -0.8,
    },
    skip: {
        color: colors.textSecondary,
        fontSize: 13,
        paddingVertical: 10,
        paddingHorizontal: 4,
    },
    main: {
        marginTop: 48,
    },
    artwork: {
        alignSelf: 'center',
        borderRadius: 22,
    },
    copy: {
        marginTop: 34,
    },
    title: {
        color: colors.text,
        fontSize: 29,
        lineHeight: 34,
        fontWeight: '800',
        letterSpacing: -0.7,
    },
    description: {
        color: colors.textSecondary,
        fontSize: 14,
        lineHeight: 21,
        marginTop: 12,
        maxWidth: 340,
    },
    footer: {
        marginTop: 'auto',
        paddingTop: 22,
        alignItems: 'stretch',
    },
    footnote: {
        color: colors.textSecondary,
        fontSize: 10,
        lineHeight: 14,
        textAlign: 'center',
        marginTop: 10,
    },
});

export default styles;
