/* =========================================================
   FOOTBALL OWNER - SAVE SYSTEM V2
   ========================================================= */

const SAVE_V2_KEY = "football_owner_saves_v2";
const SAVE_VERSION = 2;
const MAX_SAVE_SLOTS = 8;


/* ---------------------------------------------------------
   BASIC UTILITIES
--------------------------------------------------------- */

function saveV2Now() {
    return new Date().toISOString();
}


function createSaveId() {
    return (
        "career_" +
        Date.now() +
        "_" +
        Math.random()
            .toString(36)
            .slice(2, 8)
    );
}


function safeClone(data) {

    try {
        return JSON.parse(
            JSON.stringify(data)
        );
    } catch (error) {

        console.error(
            "Save clone failed:",
            error
        );

        return null;
    }
}


/* ---------------------------------------------------------
   LOAD SAVE DATABASE
--------------------------------------------------------- */

function getSaveDatabase() {

    try {

        const raw =
            localStorage.getItem(
                SAVE_V2_KEY
            );


        if (!raw) {

            return {
                version: SAVE_VERSION,
                saves: []
            };

        }


        const parsed =
            JSON.parse(raw);


        if (
            !parsed ||
            !Array.isArray(parsed.saves)
        ) {

            throw new Error(
                "Invalid save database"
            );
        }


        return parsed;

    } catch (error) {

        console.error(
            "Save database corrupted:",
            error
        );


        return {
            version: SAVE_VERSION,
            saves: []
        };

    }

}


/* ---------------------------------------------------------
   WRITE DATABASE
--------------------------------------------------------- */

function writeSaveDatabase(database) {

    try {

        localStorage.setItem(
            SAVE_V2_KEY,
            JSON.stringify(database)
        );


        return true;

    } catch (error) {

        console.error(
            "Unable to write saves:",
            error
        );


        if (
            typeof notify ===
            "function"
        ) {

            notify(
                "Save Failed",
                "Browser storage penuh atau tidak tersedia.",
                "bad"
            );

        }


        return false;

    }

}


/* ---------------------------------------------------------
   SAVE CAREER
--------------------------------------------------------- */

function saveCareerV2(
    careerState,
    saveName = "Career"
) {

    if (!careerState) {

        console.error(
            "Cannot save empty career."
        );

        return null;
    }


    const database =
        getSaveDatabase();


    /*
    Existing save detection.
    */

    let existing =
        database.saves.find(
            save =>
                save.clubId &&
                careerState.career &&
                save.clubId ===
                    careerState.career.clubId
        );


    /*
    Create new slot.
    */

    if (!existing) {

        existing = {
            id: createSaveId(),
            createdAt: saveV2Now()
        };

        database.saves.push(
            existing
        );

    }


    /*
    Save metadata.
    */

    existing.name =
        saveName ||
        "Career";


    existing.updatedAt =
        saveV2Now();


    existing.version =
        SAVE_VERSION;


    existing.clubId =
        careerState.career?.clubId
        ||
        existing.clubId
        ||
        null;


    existing.clubName =
        careerState.career?.clubName
        ||
        careerState.career?.name
        ||
        "Unknown FC";


    existing.ownerName =
        careerState.career?.ownerName
        ||
        "Owner";


    existing.division =
        careerState.career?.division
        ||
        5;


    existing.cash =
        careerState.career?.cash
        ||
        0;


    /*
    Full game state.
    */

    existing.data =
        safeClone(
            careerState
        );


    /*
    Keep newest saves only.
    */

    database.saves =
        database.saves
            .sort(
                (a, b) =>
                    new Date(b.updatedAt) -
                    new Date(a.updatedAt)
            )
            .slice(
                0,
                MAX_SAVE_SLOTS
            );


    const success =
        writeSaveDatabase(
            database
        );


    if (
        success &&
        typeof notify ===
            "function"
    ) {

        notify(
            "Career Saved",
            `${existing.clubName} berhasil disimpan.`,
            "positive"
        );

    }


    return existing.id;

}


/* ---------------------------------------------------------
   LOAD CAREER
--------------------------------------------------------- */

function loadCareerV2(
    saveId
) {

    const database =
        getSaveDatabase();


    const save =
        database.saves.find(
            item =>
                item.id === saveId
        );


    if (
        !save ||
        !save.data
    ) {

        notify?.(
            "Load Failed",
            "Save tidak ditemukan.",
            "bad"
        );


        return false;
    }


    /*
    Restore global state.
    */

    Object.keys(
        state
    ).forEach(
        key => {

            delete state[key];

        }
    );


    Object.assign(
        state,
        safeClone(
            save.data
        )
    );


    /*
    Make sure game flags exist.
    */

    state.matchdayBusy =
        false;


    state.loadedFromSave =
        true;


    state.currentSaveId =
        save.id;


    /*
    Render.
    */

    if (
        typeof render ===
        "function"
    ) {

        render();

    }


    if (
        typeof autosave ===
        "function"
    ) {

        autosave();

    }


    notify?.(
        "Career Loaded",
        `${save.clubName} berhasil dimuat.`,
        "positive"
    );


    return true;

}


/* ---------------------------------------------------------
   DELETE
--------------------------------------------------------- */

function deleteCareerV2(
    saveId
) {

    const database =
        getSaveDatabase();


    const before =
        database.saves.length;


    database.saves =
        database.saves.filter(
            save =>
                save.id !== saveId
        );


    if (
        database.saves.length ===
        before
    ) {

        return false;

    }


    writeSaveDatabase(
        database
    );


    notify?.(
        "Save Deleted",
        "Career save berhasil dihapus.",
        "positive"
    );


    if (
        typeof renderSaveList ===
        "function"
    ) {

        renderSaveList();

    }


    return true;

}


/* ---------------------------------------------------------
   LIST
--------------------------------------------------------- */

function listCareerSavesV2() {

    return getSaveDatabase()
        .saves
        .sort(
            (a, b) =>
                new Date(b.updatedAt) -
                new Date(a.updatedAt)
        );

}


/* ---------------------------------------------------------
   EXPORT
--------------------------------------------------------- */

function exportCareerV2(
    saveId
) {

    const database =
        getSaveDatabase();


    const save =
        database.saves.find(
            item =>
                item.id === saveId
        );


    if (!save) {

        notify?.(
            "Export Failed",
            "Save tidak ditemukan.",
            "bad"
        );

        return;

    }


    const blob =
        new Blob(
            [
                JSON.stringify(
                    save,
                    null,
                    2
                )
            ],
            {
                type:
                    "application/json"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        `${save.clubName || "football-owner"}-save.json`;


    link.click();


    URL.revokeObjectURL(
        url
    );


    notify?.(
        "Save Exported",
        "File save berhasil dibuat.",
        "positive"
    );

}


/* ---------------------------------------------------------
   IMPORT
--------------------------------------------------------- */

function importCareerV2(
    file
) {

    if (!file) {
        return;
    }


    const reader =
        new FileReader();


    reader.onload =
        function () {

            try {

                const save =
                    JSON.parse(
                        reader.result
                    );


                if (
                    !save.data
                ) {

                    throw new Error(
                        "Invalid save file"
                    );

                }


                const database =
                    getSaveDatabase();


                save.id =
                    createSaveId();


                save.importedAt =
                    saveV2Now();


                save.updatedAt =
                    saveV2Now();


                database.saves.push(
                    save
                );


                database.saves =
                    database.saves
                        .slice(
                            -MAX_SAVE_SLOTS
                        );


                writeSaveDatabase(
                    database
                );


                notify?.(
                    "Import Complete",
                    "Career berhasil diimport.",
                    "positive"
                );


                if (
                    typeof renderSaveList ===
                    "function"
                ) {

                    renderSaveList();

                }


            } catch (
                error
            ) {

                console.error(
                    error
                );


                notify?.(
                    "Import Failed",
                    "File save tidak valid.",
                    "bad"
                );

            }

        };


    reader.readAsText(
        file
    );

}


/* ---------------------------------------------------------
   BACKUP ALL SAVES
--------------------------------------------------------- */

function backupAllCareersV2() {

    const database =
        getSaveDatabase();


    const blob =
        new Blob(
            [
                JSON.stringify(
                    database,
                    null,
                    2
                )
            ],
            {
                type:
                    "application/json"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        "football-owner-backup.json";


    link.click();


    URL.revokeObjectURL(
        url
    );

}


/* ---------------------------------------------------------
   STORAGE INFO
--------------------------------------------------------- */

function getSaveStatsV2() {

    const database =
        getSaveDatabase();


    return {

        total:
            database.saves.length,

        max:
            MAX_SAVE_SLOTS,

        saves:
            database.saves

    };

}